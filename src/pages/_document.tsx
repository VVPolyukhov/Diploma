import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";
import type { AppProps, AppType } from "next/app";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";

export default class ModifiedDocument extends Document {
  /**
   * Костыль для того, чтобы стили antd подгружались на сервере
   */
  static async getInitialProps(ctx: DocumentContext) {
    const cache = createCache();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: AppType) => (props: AppProps) =>
          (
            <StyleProvider cache={cache}>
              <App {...props} />
            </StyleProvider>
          ),
      });

    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          <style
            data-test="extract"
            dangerouslySetInnerHTML={{ __html: extractStyle(cache) }}
          />
        </>
      ),
    };
  }

  render() {
    return (
      <Html lang="ru">
        <Head>
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          <script
            src="https://cdn.tiny.cloud/1/q17p4evekvozzk7h130bi02w7f2bvmuvzmkxhdr7cvcs2bsh/tinymce/6/tinymce.min.js"
            referrerPolicy="origin"
          ></script>
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
