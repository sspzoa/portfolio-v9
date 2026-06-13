export interface NotionTitleProperty {
  title?: { plain_text: string }[];
}

export interface NotionRichTextProperty {
  rich_text?: { plain_text: string }[];
}

export interface NotionSelectProperty {
  select?: { name: string };
}

export interface NotionMultiSelectProperty {
  multi_select?: { name: string }[];
}

export interface NotionCheckboxProperty {
  checkbox?: boolean;
}

export interface NotionNumberProperty {
  number?: number | null;
}

export interface NotionDateProperty {
  date?: { start?: string | null; end?: string | null };
}

export interface NotionFilesProperty {
  files?: { file?: { url: string }; external?: { url: string } }[];
}

export interface NotionPageWithIconAndCover {
  icon?: { file?: { url: string }; external?: { url: string } };
  cover?: { file?: { url: string }; external?: { url: string } };
  public_url?: string;
}

export interface NotionSkillPage {
  properties: {
    name?: NotionTitleProperty;
    category?: NotionSelectProperty;
    isMain?: NotionCheckboxProperty;
    icon?: NotionFilesProperty;
  };
  public_url?: string;
}

export interface NotionProjectPage extends NotionPageWithIconAndCover {
  properties: {
    name?: NotionTitleProperty;
    shortDescription?: NotionRichTextProperty;
    description?: NotionRichTextProperty;
    workPeriod?: NotionDateProperty;
    teamSize?: NotionNumberProperty;
    isSideProject?: NotionCheckboxProperty;
    tags?: NotionMultiSelectProperty;
  };
}

export interface NotionExperiencePage {
  properties: {
    role?: NotionTitleProperty;
    organization?: NotionRichTextProperty;
    description?: NotionRichTextProperty;
    date?: NotionDateProperty;
    logo?: NotionFilesProperty;
  };
}

export interface NotionCareerPage {
  properties: {
    role?: NotionTitleProperty;
    organization?: NotionRichTextProperty;
    description?: NotionRichTextProperty;
    date?: NotionDateProperty;
    logo?: NotionFilesProperty;
  };
}

export interface NotionEducationPage {
  properties: {
    department?: NotionTitleProperty;
    organization?: NotionRichTextProperty;
    description?: NotionRichTextProperty;
    date?: NotionDateProperty;
    logo?: NotionFilesProperty;
  };
}

export interface NotionCertificatePage {
  properties: {
    name?: NotionTitleProperty;
    kind?: NotionRichTextProperty;
    institution?: NotionRichTextProperty;
    date?: NotionDateProperty;
  };
}

export interface NotionAwardPage {
  properties: {
    name?: NotionTitleProperty;
    tier?: NotionRichTextProperty;
    date?: NotionDateProperty;
  };
}

export interface NotionActivityPage {
  properties: {
    name?: NotionTitleProperty;
    role?: NotionSelectProperty;
    host?: NotionMultiSelectProperty;
    date?: NotionDateProperty;
  };
}

export interface NotionAboutMePage {
  properties: {
    content?: NotionRichTextProperty;
  };
}
