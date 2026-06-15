export interface NotionTitleProperty {
  title: { plain_text: string }[];
}

export interface NotionRichTextProperty {
  rich_text: { plain_text: string }[];
}

export interface NotionSelectProperty {
  select: { name: string } | null;
}

export interface NotionMultiSelectProperty {
  multi_select: { name: string }[];
}

export interface NotionCheckboxProperty {
  checkbox: boolean;
}

export interface NotionNumberProperty {
  number: number | null;
}

export interface NotionDateProperty {
  date: { start: string | null; end: string | null } | null;
}

export interface NotionExternalFile {
  type: "external";
  external: { url: string };
}

export interface NotionHostedFile {
  type: "file";
  file: { url: string };
}

export interface NotionEmojiIcon {
  type: "emoji";
  emoji: string;
}

export type NotionFileProperty = NotionExternalFile | NotionHostedFile;

export interface NotionFilesProperty {
  files: NotionFileProperty[];
}

export interface NotionPageWithIconAndCover {
  icon: NotionFileProperty | NotionEmojiIcon | null;
  cover: NotionFileProperty | null;
  public_url: string | null;
}

export interface NotionSkillPage {
  id: string;
  properties: {
    name: NotionTitleProperty;
    category: NotionSelectProperty;
    isMain: NotionCheckboxProperty;
    icon: NotionFilesProperty;
  };
  public_url: string | null;
}

export interface NotionProjectPage extends NotionPageWithIconAndCover {
  id: string;
  properties: {
    name: NotionTitleProperty;
    shortDescription: NotionRichTextProperty;
    description: NotionRichTextProperty;
    workPeriod: NotionDateProperty;
    teamSize: NotionNumberProperty;
    isSideProject: NotionCheckboxProperty;
    tags: NotionMultiSelectProperty;
  };
}

interface NotionTimelineProperties {
  organization: NotionRichTextProperty;
  description: NotionRichTextProperty;
  date: NotionDateProperty;
  logo: NotionFilesProperty;
}

export interface NotionExperiencePage {
  id: string;
  properties: NotionTimelineProperties & {
    role: NotionTitleProperty;
  };
}

export interface NotionCareerPage {
  id: string;
  properties: NotionTimelineProperties & {
    role: NotionTitleProperty;
  };
}

export interface NotionEducationPage {
  id: string;
  properties: NotionTimelineProperties & {
    department: NotionTitleProperty;
  };
}

export interface NotionCertificatePage {
  id: string;
  properties: {
    name: NotionTitleProperty;
    kind: NotionRichTextProperty;
    institution: NotionRichTextProperty;
    date: NotionDateProperty;
  };
}

export interface NotionAwardPage {
  id: string;
  properties: {
    name: NotionTitleProperty;
    tier: NotionRichTextProperty;
    date: NotionDateProperty;
  };
}

export interface NotionActivityPage {
  id: string;
  properties: {
    name: NotionTitleProperty;
    role: NotionSelectProperty;
    host: NotionMultiSelectProperty;
    date: NotionDateProperty;
  };
}

export interface NotionAboutMePage {
  id: string;
  properties: {
    content: NotionRichTextProperty;
  };
}
