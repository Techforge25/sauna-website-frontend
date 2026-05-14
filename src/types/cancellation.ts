export type CancellationRequestStatus =
  | "submitted"
  | "reviewing"
  | "approved"
  | "rejected";

export type CancellationRequest = {
  bookingId: string;
  createdAt: string;
  id: string;
  pdfUrl?: string;
  reason: string;
  status: CancellationRequestStatus;
};
