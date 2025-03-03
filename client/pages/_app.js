import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

// this is like a customized decorator for components (such as banana.js and index.js)
const AppComponent = ({ Component, pageProps, currentUser }) => {
    return (
        <div>
            <Header currentUser={currentUser} />
            <Component {...pageProps} />
        </div>
    );
};
//for now the file's only purpose is to apply bootstrap css to all pages.
// (2025-03-03: also used to add header to every page)

AppComponent.getInitialProps = async (appContext) => {
    // CustomApp's getInitialProps takes different args from that of pages.
    // so need to use .ctx . (see buildClient usage in index.js for comparison)
    const client = buildClient(appContext.ctx);
    const { data } = await client.get('/api/users/currentuser');

    // need to obtain getInitialProps of /pages files and pass to them. otherwise won't be executed.
    let pageProps = {};
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);
    }


    return { pageProps, ...data }; // this will be fed as args to AppComponent
};

export default AppComponent;