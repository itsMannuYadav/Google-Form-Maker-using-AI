import { FormDefinition, FormQuestion, FormSection, QuestionOption } from "@/types/form";

export interface GoogleFormsBatchRequest {
  createItem?: {
    item: {
      title?: string;
      description?: string;
      questionItem?: {
        question: {
          required?: boolean;
          textQuestion?: {
            paragraph?: boolean;
          };
          choiceQuestion?: {
            type: 'RADIO' | 'CHECKBOX' | 'DROP_DOWN';
            options: Array<{
              value: string;
              goToAction?: 'NEXT_SECTION' | 'RESTART_FORM' | 'SUBMIT_FORM';
              goToSectionId?: string;
            }>;
            shuffle?: boolean;
          };
          scaleQuestion?: {
            low: number;
            high: number;
            lowLabel?: string;
            highLabel?: string;
          };
          dateQuestion?: {
            includeYear?: boolean;
            includeTime?: boolean;
          };
          timeQuestion?: {
            duration?: boolean;
          };
        };
      };
      pageBreakItem?: Record<string, unknown>;
    };
    location: {
      index: number;
    };
  };
  updateFormInfo?: {
    info: {
      description?: string;
    };
    updateMask: string;
  };
}

/**
 * Converts a validated FormDefinition into Google Forms API v1 create & batchUpdate payloads
 */
export function buildGoogleFormsRequests(formDef: FormDefinition): {
  initialInfo: { title: string; documentTitle: string };
  batchRequests: GoogleFormsBatchRequest[];
} {
  const initialInfo = {
    title: formDef.title || "Untitled Form",
    documentTitle: formDef.title || "Untitled Form",
  };

  const batchRequests: GoogleFormsBatchRequest[] = [];

  // Update description if present
  if (formDef.description) {
    batchRequests.push({
      updateFormInfo: {
        info: {
          description: formDef.description,
        },
        updateMask: "description",
      },
    });
  }

  let itemIndex = 0;

  formDef.sections.forEach((section, sectionIdx) => {
    // If it's not the first section, insert a Page Break (Section Break)
    if (sectionIdx > 0) {
      batchRequests.push({
        createItem: {
          item: {
            title: section.title,
            description: section.description || undefined,
            pageBreakItem: {},
          },
          location: {
            index: itemIndex++,
          },
        },
      });
    }

    // Insert all questions inside this section
    section.questions.forEach((q) => {
      const questionItem = buildQuestionItem(q);
      if (questionItem) {
        batchRequests.push({
          createItem: {
            item: {
              title: q.title,
              description: q.description || undefined,
              questionItem,
            },
            location: {
              index: itemIndex++,
            },
          },
        });
      }
    });
  });

  return { initialInfo, batchRequests };
}

function buildQuestionItem(q: FormQuestion) {
  const baseQuestion: { required: boolean } = {
    required: !!q.required,
  };

  switch (q.type) {
    case 'SHORT_ANSWER':
      return {
        question: {
          ...baseQuestion,
          textQuestion: { paragraph: false },
        },
      };

    case 'PARAGRAPH':
      return {
        question: {
          ...baseQuestion,
          textQuestion: { paragraph: true },
        },
      };

    case 'MULTIPLE_CHOICE':
      return {
        question: {
          ...baseQuestion,
          choiceQuestion: {
            type: 'RADIO' as const,
            options: (q.options && q.options.length > 0 ? q.options : [{ id: '1', value: 'Option 1' }]).map(
              (opt) => ({ value: opt.value })
            ),
          },
        },
      };

    case 'CHECKBOXES':
      return {
        question: {
          ...baseQuestion,
          choiceQuestion: {
            type: 'CHECKBOX' as const,
            options: (q.options && q.options.length > 0 ? q.options : [{ id: '1', value: 'Option 1' }]).map(
              (opt) => ({ value: opt.value })
            ),
          },
        },
      };

    case 'DROPDOWN':
      return {
        question: {
          ...baseQuestion,
          choiceQuestion: {
            type: 'DROP_DOWN' as const,
            options: (q.options && q.options.length > 0 ? q.options : [{ id: '1', value: 'Option 1' }]).map(
              (opt) => ({ value: opt.value })
            ),
          },
        },
      };

    case 'LINEAR_SCALE':
      return {
        question: {
          ...baseQuestion,
          scaleQuestion: {
            low: q.scaleConfig?.low ?? 1,
            high: q.scaleConfig?.high ?? 5,
            lowLabel: q.scaleConfig?.lowLabel || undefined,
            highLabel: q.scaleConfig?.highLabel || undefined,
          },
        },
      };

    case 'DATE':
      return {
        question: {
          ...baseQuestion,
          dateQuestion: {
            includeYear: q.dateConfig?.includeYear ?? true,
            includeTime: q.dateConfig?.includeTime ?? false,
          },
        },
      };

    case 'TIME':
      return {
        question: {
          ...baseQuestion,
          timeQuestion: {
            duration: false,
          },
        },
      };

    default:
      return {
        question: {
          ...baseQuestion,
          textQuestion: { paragraph: false },
        },
      };
  }
}
