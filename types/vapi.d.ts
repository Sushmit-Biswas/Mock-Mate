// Defines the types of messages that can be exchanged with the Vapi API.
enum MessageTypeEnum {
  TRANSCRIPT = "transcript", // Represents a transcription message.
  FUNCTION_CALL = "function-call", // Represents a request to call a function.
  FUNCTION_CALL_RESULT = "function-call-result", // Represents the result of a function call.
  ADD_MESSAGE = "add-message", // Represents a message to be added to the conversation.
}

// Defines the possible roles for a message sender.
enum MessageRoleEnum {
  USER = "user", // Message from the user.
  SYSTEM = "system", // Message from the system.
  ASSISTANT = "assistant", // Message from the AI assistant.
}

// Defines the types of transcript messages.
enum TranscriptMessageTypeEnum {
  PARTIAL = "partial", // A partial transcript that may change.
  FINAL = "final", // The final, confirmed transcript.
}

// Base interface for all message types.
interface BaseMessage {
  type: MessageTypeEnum; // The type of the message.
}

// Interface for transcript messages.
interface TranscriptMessage extends BaseMessage {
  type: MessageTypeEnum.TRANSCRIPT;
  role: MessageRoleEnum; // The role of the speaker.
  transcriptType: TranscriptMessageTypeEnum; // Whether the transcript is partial or final.
  transcript: string; // The transcribed text.
}

// Interface for function call messages.
interface FunctionCallMessage extends BaseMessage {
  type: MessageTypeEnum.FUNCTION_CALL;
  functionCall: {
    name: string; // The name of the function to call.
    parameters: unknown; // The parameters for the function call.
  };
}

// Interface for function call result messages.
interface FunctionCallResultMessage extends BaseMessage {
  type: MessageTypeEnum.FUNCTION_CALL_RESULT;
  functionCallResult: {
    forwardToClientEnabled?: boolean; // Whether the result should be forwarded to the client.
    result: unknown; // The result of the function call.
    [a: string]: unknown; // Allows for additional properties.
  };
}

// Union type representing any possible message from the Vapi API.
type Message =
  | TranscriptMessage
  | FunctionCallMessage
  | FunctionCallResultMessage;
