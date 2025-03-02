import axios from "axios";

// requests made in Components are always issued from browser
const LandingPage = ({ currentUser }) => {
    console.log(currentUser);

    return <h1>Landing page</h1>
}

// Requests made in getInitialProps issued from server.
// Except for in-app nav where requests will be issued from browser.
LandingPage.getInitialProps = async ({ req }) => {
    if (typeof window === 'undefined') {
        // we are on the server! request should be made to
        // http://ingress-nginx-controller.ingress-nginx... (kubernetes namespace)
        // This is because server is running in Pods and it can't reach ticketing.dev url
        const { data } = await axios.get(
            'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
            { headers: req.headers, }
        ).catch((err) => console.log(err.message));

        return data;

    } else {
        // we are on the browser. requests can be made with a base url of ''.
        // Can only use axios here. Can't use use-request hook because hooks can only be used in React Components.
        const { data } = await axios.get('/api/users/currentuser').catch((err) => console.log(err.message));

        return data;
    }


};
// getInitialProps runs on server side and feeds props into the LandingPage component.
// this is how to typically load data during the server-side rendering phase.
// e.g. to fetch signed-in status.

export default LandingPage;