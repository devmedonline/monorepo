export enum PublicationStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ANY = 'any',
}

export const isPublicationStatus = (
  value: string,
): value is PublicationStatus => {
  const statuses: string[] = Object.values(PublicationStatus);
  return statuses.includes(value);
};

export const isPublished = (status: PublicationStatus) =>
  status === PublicationStatus.PUBLISHED;
