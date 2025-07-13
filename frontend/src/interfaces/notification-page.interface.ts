export interface NotificationProps {
  message: string;
  type: "success" | "error";
  time?: string;
}