declare module "email-js" {
  export function isValidEmail(email: string): boolean
  export function getLocalPart(email: string): string
  export function getDomainPart(email: string): string
}
