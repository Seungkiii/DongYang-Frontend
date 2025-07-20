// Deprecated: Use chatApi.ts for all insurance queries (RAG)
export const getInsuranceInfo = async (_insuranceName: string) => {
  throw new Error('This endpoint is deprecated. Use chatService.sendMessage for insurance info.');
};

// Deprecated: Use chatApi.ts for all insurance queries (RAG)
export const compareInsurances = async (_insuranceNames: string[]) => {
  throw new Error('This endpoint is deprecated. Use chatService.sendMessage for insurance comparison.');
};

// Deprecated: Use chatApi.ts for all insurance queries (RAG)
export const recommendInsurances = async (_age: number, _purpose: string, _coverageType: string) => {
  throw new Error('This endpoint is deprecated. Use chatService.sendMessage for insurance recommendation.');
};
