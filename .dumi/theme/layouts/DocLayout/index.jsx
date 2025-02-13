// import { ReactComponent as IconSidebar } from '@ant-design/icons-svg/inline-svg/outlined/align-left.svg';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import ViewSidebarRoundedIcon from '@mui/icons-material/ViewSidebarRounded';
import { Box, Button } from '@mui/material';

import animateScrollTo from 'animated-scroll-to';
import {
  Helmet,
  useIntl,
  useLocation,
  useOutlet,
  usePrefersColor,
  useRouteMeta,
  useSidebarData,
  useSiteData,
} from 'dumi';
import Content from 'dumi/theme/slots/Content';
import ContentFooter from 'dumi/theme/slots/ContentFooter';
// import Footer from 'dumi/theme/slots/Footer';
import Toc from 'dumi/theme/slots/Toc';
import React, { useEffect, useState } from 'react';
import Footer from '../../slots/Footer';
import Header from '../../slots/Header';
import Sidebar from '../../slots/Sidebar';
import HomePageLayout from '../HomePageLayout';
import './index.less';

const DocLayout = () => {
  const intl = useIntl();
  const outlet = useOutlet();
  const sidebar = useSidebarData();
  const { hash, pathname } = useLocation();
  const { loading, hostname } = useSiteData();
  const [activateSidebar, updateActivateSidebar] = useState(false);
  const { frontmatter: fm } = useRouteMeta();

  const showSidebar = fm.sidebar !== false && sidebar?.length > 0;

  const [prefersColor, setPrefersColor] = usePrefersColor();

  // handle hash change or visit page hash after async chunk loaded
  useEffect(() => {
    const id = hash.replace('#', '');

    if (id) {
      setTimeout(() => {
        const elm = document.getElementById(decodeURIComponent(id));

        if (elm) {
          // animated-scroll-to instead of native scroll
          animateScrollTo(elm.offsetTop - 80, {
            maxDuration: 300,
          });
        }
      }, 1);
    }
  }, [loading, hash]);

  if (
    ['', '/'].some((path) => path === pathname) ||
    ['/index', '/pro', '/pricing'].some((path) => pathname.startsWith(path))
  ) {
    return <HomePageLayout />;
  }

  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          mode: prefersColor,
        },
      })}
    >
      <div
        className="dumi-default-doc-layout"
        data-mobile-sidebar-active={activateSidebar || undefined}
        onClick={() => updateActivateSidebar(false)}
      >
        <Helmet>
          <html lang={intl.locale.replace(/-.+$/, '')} />
          {fm.title && <title>XText: {fm.title}</title>}
          {fm.title && <meta property="og:title" content={fm.title} />}
          {fm.description && (
            <meta name="description" content={fm.description} />
          )}
          {fm.description && (
            <meta property="og:description" content={fm.description} />
          )}
          {fm.keywords && (
            <meta name="keywords" content={fm.keywords.join(',')} />
          )}
          {fm.keywords &&
            fm.keywords.map((keyword) => (
              <meta
                key={keyword}
                property="article:tag"
                content={keyword}
              ></meta>
            ))}
          {hostname && <link rel="canonical" href={hostname + pathname} />}
        </Helmet>
        <Header />
        {showSidebar && (
          <Box className="dumi-default-doc-layout-mobile-bar">
            <Button
              variant="text"
              onClick={(ev) => {
                ev.stopPropagation();
                updateActivateSidebar((v) => !v);
              }}
              startIcon={<ViewSidebarRoundedIcon />}
            >
              {intl.formatMessage({ id: 'layout.sidebar.btn' })}
            </Button>
          </Box>
        )}

        <main
          style={{
            padding: pathname === '/' ? 0 : 24,
          }}
        >
          {showSidebar && <Sidebar />}
          <Content>
            <article>{outlet}</article>
            <ContentFooter />
          </Content>
          {fm.toc === 'content' && (
            <div className="dumi-default-doc-layout-toc-wrapper">
              <h4>TABLE OF CONTENTS</h4>
              <Toc />
            </div>
          )}
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default DocLayout;
