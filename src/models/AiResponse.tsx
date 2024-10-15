
export interface AiExtendedResponse {
    chatLanguageModel: string,
    prompt: string,
    aiResponse: Response<AiMessage>,
    timeStamp: number,
}


export interface AiMessage {
    text: string,
    toolExecutionRequests: Map<string, unknown>
}

export interface Response<T> {
    content: T,
    tokenUsage: TokenUsage,
    finishReason: string,
    metadata: Map<string, string>
}

export interface TokenUsage {
    "inputTokenCount": string,
    "outputTokenCount": string,
    "totalTokenCount": string,
}
