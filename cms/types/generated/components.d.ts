import type { Schema, Attribute } from '@strapi/strapi';

export interface SubjectDetails extends Schema.Component {
  collectionName: 'components_subject_details';
  info: {
    displayName: 'details';
  };
  attributes: {
    name: Attribute.String;
    description: Attribute.RichText;
    media: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    featured: Attribute.Boolean;
    featuredOrder: Attribute.Integer &
      Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      > &
      Attribute.DefaultTo<0>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'subject.details': SubjectDetails;
    }
  }
}
