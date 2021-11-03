import "../styles.css";
import dynamic from "next/dynamic";
import { TinaEditProvider } from "tinacms/dist/edit-state";
import { Layout } from "../components/layout";
import { TinaCMS, TinaProvider, Client, LocalClient } from "tinacms";
import { useMemo, useEffect } from "react";
// @ts-ignore FIXME: default export needs to be 'ComponentType<{}>
const TinaCloudProvider = dynamic(() => import("tinacms"), { ssr: false });

const NEXT_PUBLIC_TINA_CLIENT_ID = process.env.NEXT_PUBLIC_TINA_CLIENT_ID;
const NEXT_PUBLIC_USE_LOCAL_CLIENT =
  process.env.NEXT_PUBLIC_USE_LOCAL_CLIENT || true;

const App = ({ Component, pageProps }) => {
  const cms = useMemo(
    () =>
      new TinaCMS({
        enabled: true,
        sidebar: true,
        apis: {
          tina:
            process.env.NODE_ENV == "production"
              ? new Client({ branch: "main", clientId: "" })
              : new LocalClient(),
        },
      })
  );
  useEffect(() => {
    import("react-tinacms-editor").then(({ MarkdownFieldPlugin }) => {
      cms.plugins.add(MarkdownFieldPlugin);
    });
  });
  return (
    <>
      <TinaEditProvider
        showEditButton={true}
        editMode={
          <TinaProvider cms={cms}>
            <TinaCloudProvider
              mediaStore={import("next-tinacms-cloudinary").then(
                ({ TinaCloudCloudinaryMediaStore }) =>
                  TinaCloudCloudinaryMediaStore
              )}
              documentCreatorCallback={{
                /**
                 * After a new document is created, redirect to its location
                 */
                onNewDocument: ({ collection: { slug }, breadcrumbs }) => {
                  const relativeUrl = `/${slug}/${breadcrumbs.join("/")}`;
                  return (window.location.href = relativeUrl);
                },
                /**
                 * Only allows documents to be created to the `Blog Posts` Collection
                 */
                filterCollections: (options) => {
                  return options.filter(
                    (option) => option.label === "Blog Posts"
                  );
                },
              }}
              formifyCallback={({
                formConfig,
                createForm,
                createGlobalForm,
              }) => {
                if (formConfig.id === "getGlobalDocument") {
                  return createGlobalForm(formConfig);
                }

                return createForm(formConfig);
              }}
              {...pageProps}
            >
              {(livePageProps) => (
                <Layout
                  rawData={livePageProps}
                  data={livePageProps.data?.getGlobalDocument?.data}
                >
                  <Component {...livePageProps} />
                </Layout>
              )}
            </TinaCloudProvider>
          </TinaProvider>
        }
      >
        <Layout
          rawData={pageProps}
          data={pageProps.data?.getGlobalDocument?.data}
        >
          <Component {...pageProps} />
        </Layout>
      </TinaEditProvider>
    </>
  );
};

export default App;
