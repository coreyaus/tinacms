//@ts-nocheck
// DO NOT MODIFY THIS FILE. This file is automatically generated by Tina
import { gql } from 'tinacms';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** References another document, used as a foreign key */
  Reference: any;
  JSON: any;
};

export type SystemInfo = {
  __typename?: 'SystemInfo';
  filename: Scalars['String'];
  basename: Scalars['String'];
  breadcrumbs: Array<Scalars['String']>;
  path: Scalars['String'];
  relativePath: Scalars['String'];
  extension: Scalars['String'];
  template: Scalars['String'];
  collection: Collection;
};


export type SystemInfoBreadcrumbsArgs = {
  excludeExtension?: Maybe<Scalars['Boolean']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  hasPreviousPage: Scalars['Boolean'];
  hasNextPage: Scalars['Boolean'];
  startCursor: Scalars['String'];
  endCursor: Scalars['String'];
};

export type Node = {
  id: Scalars['ID'];
};

export type Document = {
  sys?: Maybe<SystemInfo>;
  id: Scalars['ID'];
  form: Scalars['JSON'];
  values: Scalars['JSON'];
};

/** A relay-compliant pagination connection */
export type Connection = {
  totalCount: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  getOptimizedQuery?: Maybe<Scalars['String']>;
  collection: Collection;
  collections: Array<Collection>;
  node: Node;
  document: DocumentNode;
  documentConnection: DocumentConnection;
  getDocumentFields: Scalars['JSON'];
  page: PageDocument;
  pageConnection: PageConnection;
  post: PostDocument;
  postConnection: PostConnection;
};


export type QueryGetOptimizedQueryArgs = {
  queryString: Scalars['String'];
};


export type QueryCollectionArgs = {
  collection?: Maybe<Scalars['String']>;
};


export type QueryNodeArgs = {
  id?: Maybe<Scalars['String']>;
};


export type QueryDocumentArgs = {
  collection?: Maybe<Scalars['String']>;
  relativePath?: Maybe<Scalars['String']>;
};


export type QueryDocumentConnectionArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Float']>;
  last?: Maybe<Scalars['Float']>;
  sort?: Maybe<Scalars['String']>;
};


export type QueryPageArgs = {
  relativePath?: Maybe<Scalars['String']>;
};


export type QueryPageConnectionArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Float']>;
  last?: Maybe<Scalars['Float']>;
  sort?: Maybe<Scalars['String']>;
};


export type QueryPostArgs = {
  relativePath?: Maybe<Scalars['String']>;
};


export type QueryPostConnectionArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Float']>;
  last?: Maybe<Scalars['Float']>;
  sort?: Maybe<Scalars['String']>;
};

export type DocumentConnectionEdges = {
  __typename?: 'DocumentConnectionEdges';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<DocumentNode>;
};

export type DocumentConnection = Connection & {
  __typename?: 'DocumentConnection';
  pageInfo?: Maybe<PageInfo>;
  totalCount: Scalars['Float'];
  edges?: Maybe<Array<Maybe<DocumentConnectionEdges>>>;
};

export type Collection = {
  __typename?: 'Collection';
  name: Scalars['String'];
  slug: Scalars['String'];
  label?: Maybe<Scalars['String']>;
  path: Scalars['String'];
  format?: Maybe<Scalars['String']>;
  matches?: Maybe<Scalars['String']>;
  templates?: Maybe<Array<Maybe<Scalars['JSON']>>>;
  fields?: Maybe<Array<Maybe<Scalars['JSON']>>>;
  documents: DocumentConnection;
};


export type CollectionDocumentsArgs = {
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
  first?: Maybe<Scalars['Float']>;
  last?: Maybe<Scalars['Float']>;
  sort?: Maybe<Scalars['String']>;
};

export type DocumentNode = PageDocument | PostDocument;

export type Page = {
  __typename?: 'Page';
  heading?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['JSON']>;
};

export type PageDocument = Node & Document & {
  __typename?: 'PageDocument';
  id: Scalars['ID'];
  sys: SystemInfo;
  data: Page;
  form: Scalars['JSON'];
  values: Scalars['JSON'];
  dataJSON: Scalars['JSON'];
};

export type PageConnectionEdges = {
  __typename?: 'PageConnectionEdges';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<PageDocument>;
};

export type PageConnection = Connection & {
  __typename?: 'PageConnection';
  pageInfo?: Maybe<PageInfo>;
  totalCount: Scalars['Float'];
  edges?: Maybe<Array<Maybe<PageConnectionEdges>>>;
};

export type Post = {
  __typename?: 'Post';
  title?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['JSON']>;
};

export type PostDocument = Node & Document & {
  __typename?: 'PostDocument';
  id: Scalars['ID'];
  sys: SystemInfo;
  data: Post;
  form: Scalars['JSON'];
  values: Scalars['JSON'];
  dataJSON: Scalars['JSON'];
};

export type PostConnectionEdges = {
  __typename?: 'PostConnectionEdges';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<PostDocument>;
};

export type PostConnection = Connection & {
  __typename?: 'PostConnection';
  pageInfo?: Maybe<PageInfo>;
  totalCount: Scalars['Float'];
  edges?: Maybe<Array<Maybe<PostConnectionEdges>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addPendingDocument: DocumentNode;
  updateDocument: DocumentNode;
  createDocument: DocumentNode;
  updatePage: PageDocument;
  createPage: PageDocument;
  updatePost: PostDocument;
  createPost: PostDocument;
};


export type MutationAddPendingDocumentArgs = {
  collection: Scalars['String'];
  relativePath: Scalars['String'];
  template?: Maybe<Scalars['String']>;
};


export type MutationUpdateDocumentArgs = {
  collection?: Maybe<Scalars['String']>;
  relativePath: Scalars['String'];
  params: DocumentMutation;
};


export type MutationCreateDocumentArgs = {
  collection?: Maybe<Scalars['String']>;
  relativePath: Scalars['String'];
  params: DocumentMutation;
};


export type MutationUpdatePageArgs = {
  relativePath: Scalars['String'];
  params: PageMutation;
};


export type MutationCreatePageArgs = {
  relativePath: Scalars['String'];
  params: PageMutation;
};


export type MutationUpdatePostArgs = {
  relativePath: Scalars['String'];
  params: PostMutation;
};


export type MutationCreatePostArgs = {
  relativePath: Scalars['String'];
  params: PostMutation;
};

export type DocumentMutation = {
  page?: Maybe<PageMutation>;
  post?: Maybe<PostMutation>;
};

export type PageMutation = {
  heading?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['JSON']>;
};

export type PostMutation = {
  title?: Maybe<Scalars['String']>;
  body?: Maybe<Scalars['JSON']>;
};

export type PagePartsFragment = { __typename?: 'Page', heading?: Maybe<string>, subtitle?: Maybe<string>, body?: Maybe<any> };

export type PostPartsFragment = { __typename?: 'Post', title?: Maybe<string>, body?: Maybe<any> };

export type PageQueryVariables = Exact<{
  relativePath: Scalars['String'];
}>;


export type PageQuery = { __typename?: 'Query', page: { __typename?: 'PageDocument', id: string, sys: { __typename?: 'SystemInfo', filename: string, basename: string, breadcrumbs: Array<string>, path: string, relativePath: string, extension: string }, data: { __typename?: 'Page', heading?: Maybe<string>, subtitle?: Maybe<string>, body?: Maybe<any> } } };

export type PageConnectionQueryVariables = Exact<{ [key: string]: never; }>;


export type PageConnectionQuery = { __typename?: 'Query', pageConnection: { __typename?: 'PageConnection', totalCount: number, edges?: Maybe<Array<Maybe<{ __typename?: 'PageConnectionEdges', node?: Maybe<{ __typename?: 'PageDocument', id: string, sys: { __typename?: 'SystemInfo', filename: string, basename: string, breadcrumbs: Array<string>, path: string, relativePath: string, extension: string }, data: { __typename?: 'Page', heading?: Maybe<string>, subtitle?: Maybe<string>, body?: Maybe<any> } }> }>>> } };

export type PostQueryVariables = Exact<{
  relativePath: Scalars['String'];
}>;


export type PostQuery = { __typename?: 'Query', post: { __typename?: 'PostDocument', id: string, sys: { __typename?: 'SystemInfo', filename: string, basename: string, breadcrumbs: Array<string>, path: string, relativePath: string, extension: string }, data: { __typename?: 'Post', title?: Maybe<string>, body?: Maybe<any> } } };

export type PostConnectionQueryVariables = Exact<{ [key: string]: never; }>;


export type PostConnectionQuery = { __typename?: 'Query', postConnection: { __typename?: 'PostConnection', totalCount: number, edges?: Maybe<Array<Maybe<{ __typename?: 'PostConnectionEdges', node?: Maybe<{ __typename?: 'PostDocument', id: string, sys: { __typename?: 'SystemInfo', filename: string, basename: string, breadcrumbs: Array<string>, path: string, relativePath: string, extension: string }, data: { __typename?: 'Post', title?: Maybe<string>, body?: Maybe<any> } }> }>>> } };

export const PagePartsFragmentDoc = gql`
    fragment PageParts on Page {
  heading
  subtitle
  body
}
    `;
export const PostPartsFragmentDoc = gql`
    fragment PostParts on Post {
  title
  body
}
    `;
export const PageDocument = gql`
    query page($relativePath: String!) {
  page(relativePath: $relativePath) {
    sys {
      filename
      basename
      breadcrumbs
      path
      relativePath
      extension
    }
    id
    data {
      ...PageParts
    }
  }
}
    ${PagePartsFragmentDoc}`;
export const PageConnectionDocument = gql`
    query pageConnection {
  pageConnection {
    totalCount
    edges {
      node {
        id
        sys {
          filename
          basename
          breadcrumbs
          path
          relativePath
          extension
        }
        data {
          ...PageParts
        }
      }
    }
  }
}
    ${PagePartsFragmentDoc}`;
export const PostDocument = gql`
    query post($relativePath: String!) {
  post(relativePath: $relativePath) {
    sys {
      filename
      basename
      breadcrumbs
      path
      relativePath
      extension
    }
    id
    data {
      ...PostParts
    }
  }
}
    ${PostPartsFragmentDoc}`;
export const PostConnectionDocument = gql`
    query postConnection {
  postConnection {
    totalCount
    edges {
      node {
        id
        sys {
          filename
          basename
          breadcrumbs
          path
          relativePath
          extension
        }
        data {
          ...PostParts
        }
      }
    }
  }
}
    ${PostPartsFragmentDoc}`;
export type Requester<C= {}> = <R, V>(doc: DocumentNode, vars?: V, options?: C) => Promise<R>
  export function getSdk<C>(requester: Requester<C>) {
    return {
      page(variables: PageQueryVariables, options?: C): Promise<{data: PageQuery, variables: PageQueryVariables, query: string}> {
        return requester<{data: PageQuery, variables: PageQueryVariables, query: string}, PageQueryVariables>(PageDocument, variables, options);
      },
    pageConnection(variables?: PageConnectionQueryVariables, options?: C): Promise<{data: PageConnectionQuery, variables: PageConnectionQueryVariables, query: string}> {
        return requester<{data: PageConnectionQuery, variables: PageConnectionQueryVariables, query: string}, PageConnectionQueryVariables>(PageConnectionDocument, variables, options);
      },
    post(variables: PostQueryVariables, options?: C): Promise<{data: PostQuery, variables: PostQueryVariables, query: string}> {
        return requester<{data: PostQuery, variables: PostQueryVariables, query: string}, PostQueryVariables>(PostDocument, variables, options);
      },
    postConnection(variables?: PostConnectionQueryVariables, options?: C): Promise<{data: PostConnectionQuery, variables: PostConnectionQueryVariables, query: string}> {
        return requester<{data: PostConnectionQuery, variables: PostConnectionQueryVariables, query: string}, PostConnectionQueryVariables>(PostConnectionDocument, variables, options);
      }
    };
  }
  export type Sdk = ReturnType<typeof getSdk>;

// TinaSDK generated code
import { staticRequest } from 'tinacms'
const requester: (doc: any, vars?: any, options?: any) => Promise<any> = async (
  doc,
  vars,
  _options
) => {
  let data = {}
  try {
    data = await staticRequest({
      query: doc,
      variables: vars,
    })
  } catch (e) {
    // swallow errors related to document creation
    console.warn('Warning: There was an error when fetching data')
    console.warn(e)
  }

  return { data, query: doc, variables: vars || {} }
}

/**
 * @experimental this class can be used but may change in the future
 **/
export const ExperimentalGetTinaClient = ()=>getSdk(requester)

