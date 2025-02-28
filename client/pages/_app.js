import 'bootstrap/dist/css/bootstrap.css';

// this is like a customized decorator for components (such as banana.js and index.js)
export default ({ Component, pageProps }) => {
    return <Component {...pageProps} />
};
//for now the file's only purpose is to apply bootstrap css to all pages.