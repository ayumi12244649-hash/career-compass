export const companyResearchSchema = {
  name: "company_research",

  strict: true,

  schema: {
    type: "object",

    additionalProperties: false,

    properties: {
      summary: {
        type: "string",
      },

      business: {
        type: "string",
      },

      culture: {
        type: "string",
      },

      ideal_candidate: {
        type: "string",
      },

      strengths: {
        type: "array",
        items: {
          type: "string",
        },
      },

      weaknesses: {
        type: "array",
        items: {
          type: "string",
        },
      },

      application_points: {
        type: "array",
        items: {
          type: "string",
        },
      },

      interview_questions: {
        type: "array",
        items: {
          type: "string",
        },
      },

      reverse_questions: {
        type: "array",
        items: {
          type: "string",
        },
      },
    },

    required: [
      "summary",
      "business",
      "culture",
      "ideal_candidate",
      "strengths",
      "weaknesses",
      "application_points",
      "interview_questions",
      "reverse_questions",
    ],
  },
} as const;