import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import '../styles/index.scss';
import getConfig from 'next/config';
import { PORT } from '../constants';
// import "cross-fetch/polyfill";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import withRedux from "next-redux-wrapper";
import initStore from "../redux/config";
import { WINDOW } from "../constants";
import "../styles/index.scss";
import Actions from "../redux/actions";
import Router from 'next/router'
import RouteChangeLoader from '../components/common/RouteChangeLoader';
// import DevAuth from '../components/common/DevAuth';
import AppTheme from '../theme/Index';
import { ThemeProvider } from '@material-ui/core/styles';
import Layout from '../components/layout/Layout';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';

class MyApp extends App {
  // Only uncomment this method if you have blocking data requirements for
  // every single page in your application. This disables the ability to
  // perform automatic static optimization, causing every page in your app to
  // be server-side rendered.
  //
  // static async getInitialProps(appContext) {
  //   // calls page's `getInitialProps` and fills `appProps.pageProps`
  //   const appProps = await App.getInitialProps(appContext);
  //
  //   return { ...appProps }
  // }

  constructor(props) {
    super(props);
    this.state = {
      scripts: [],
      scriptsLoadedTillNow: 0,
    }
  }

  initMap = () => { };

  updateWindowDims = () => {
      const {
        store: { dispatch, getState }
      } = this.props;
      const reduxState = getState();
      const { height, width } = reduxState.window;
      if (
        Math.abs(window.innerHeight - height) > 10 ||
        Math.abs(window.innerWidth - width) > 10
      )
        dispatch(
          Actions.window.updateWindowDims({
            height: window.innerHeight,
            width: window.innerWidth
          })
        );
    };

  handleRouteChangeStart = (url) => {
    console.log(`Loading: ${url} from`, Router.pathname)
    const { store: { dispatch, getState } } = this.props;
    // console.log(getState())
    if(!getState().window.loading) {
      dispatch(Actions.window.updateWindowLoading(true))
    }
  }

  handleRouteChangeComplete = () => {
    console.log(`Loaded URL`)  
    const { store: { dispatch, getState } } = this.props;
    // console.log(getState())
    if(getState().window.loading) {
      dispatch(Actions.window.updateWindowLoading(false))
    }
  }

  handleRouteChangeError = (err, url) => {
    console.log(`Error Loading URL ${url} with error`, err)
    const { store: { dispatch, getState } } = this.props;
    if(getState().window.loading) {
      dispatch(Actions.window.updateWindowLoading(false))
    }
  }

  componentDidMount() {
    // console.log(PORT, getConfig());
    Router.events.on('routeChangeStart', this.handleRouteChangeStart)
    Router.events.on('routeChangeComplete', this.handleRouteChangeComplete)
    Router.events.on('routeChangeError', this.handleRouteChangeError)

    this.updateWindowDims();
    window.addEventListener("resize", this.updateWindowDims);
    window.initMap = this.initMap.bind(this);
    window.document.body.onload = () => {
      console.log(`Document Loaded at ${new Date().toString()}`);
      console.log(this.state.scriptsLoadedTillNow, this.state.scripts.length);

      if (this.state.scriptsLoadedTillNow === this.state.scripts.length) {
        console.log("All Scripts Loaded!");
        dispatch(Actions.scripts.setLoaded(true));
      }
    };
    const { scripts, scriptsLoadedTillNow } = this.state;
    const {
      store: { dispatch, getState }
    } = this.props;
    for (let i = 0; i < scripts.length; i += 1) {
      console.log(`Scripts Loading Started at ${new Date().toString()}`);
      let s = document.createElement("script");
      window.document.body.appendChild(s);
      s.onload = () => {
        this.setState(
          state => ({
            ...state,
            scriptsLoadedTillNow: state.scriptsLoadedTillNow + 1
          }),
          () => {
            console.log(
              i,
              this.state.scriptsLoadedTillNow,
              new Date().toString()
            );
          }
        );
        scripts[i].onLoad && scripts[i].onLoad();
      };
      // ()=>console.log(`Script ${i+1} Loaded at ${new Date().toString()}`);
      s.src = scripts[i].src;
      if (s.integrity) s.integrity = scripts[i].integrity;
      if (s.crossOrigin) s.crossOrigin = scripts[i].crossOrigin;
    }
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDims);
    Router.events.on('routeChangeStart', this.handleRouteChangeStart)
    Router.events.on('routeChangeComplete', this.handleRouteChangeComplete)
    Router.events.on('routeChangeError', this.handleRouteChangeError)
  }

  

  render() {
    const { Component, pageProps, store } = this.props;
    return (
      <ThemeProvider theme={AppTheme}>
        <Head>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        </Head>
        <Provider store={store}>
          <PersistGate persistor={store.__PERSISTOR} loading={null}>
            <RouteChangeLoader>
              <Layout>
                {/* <DevAuth> */}
                  <Component {...pageProps} />
                {/* </DevAuth> */}
              </Layout>
            </RouteChangeLoader>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    );
  }
}

export default withRedux(initStore, { debug: true })(MyApp);