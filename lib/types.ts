export type SubmissionStatus = "pending" | "published" | "rejected";
export type ContributorRole =
  | "viewer"
  | "gallery_contributor"
  | "library_publisher"
  | "editor"
  | "admin";

export type GalleryItem = {
  id: string;
  title_en: string;
  title_mr: string | null;
  caption_en: string | null;
  caption_mr: string | null;
  department_slug: string | null;
  event_date: string | null;
  created_at: string;
};

export type Publication = {
  id: string;
  title_en: string;
  title_mr: string | null;
  abstract_en: string | null;
  abstract_mr: string | null;
  body_en: string | null;
  body_mr: string | null;
  authors: string;
  publication_type: string;
  language: string;
  published_at: string | null;
  pdf_path: string | null;
  created_at: string;
};

export type ContributorProfile = {
  id: string;
  display_name: string | null;
  email?: string | null;
  role: ContributorRole;
  approved: boolean;
};

export type ContributorGallerySubmission = {
  id: string;
  title_en: string;
  status: SubmissionStatus;
  created_at: string;
};

export type ContributorPublicationSubmission = {
  id: string;
  title_en: string;
  publication_type: string;
  status: SubmissionStatus;
  created_at: string;
};

export type AdminProfile = ContributorProfile & {
  email: string | null;
  created_at: string;
};

export type AdminGalleryItem = {
  id: string;
  owner_id: string;
  title_en: string;
  title_mr: string | null;
  caption_en: string | null;
  caption_mr: string | null;
  department_slug: string | null;
  event_date: string | null;
  status: SubmissionStatus;
  created_at: string;
};

export type AdminPublication = {
  id: string;
  owner_id: string;
  title_en: string;
  title_mr: string | null;
  abstract_en: string | null;
  abstract_mr: string | null;
  body_en: string | null;
  body_mr: string | null;
  authors: string;
  publication_type: string;
  language: string;
  status: SubmissionStatus;
  created_at: string;
  published_at: string | null;
  pdf_path: string | null;
};

export type AdminOverview = {
  currentAdminId: string;
  profiles: AdminProfile[];
  gallery: AdminGalleryItem[];
  publications: AdminPublication[];
};
