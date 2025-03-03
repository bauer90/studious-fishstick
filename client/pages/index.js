import axios from "axios";
import buildClient from "../api/build-client";

// requests made in Components are always issued from browser
const LandingPage = ({ currentUser }) => {
    return currentUser ? <h1>You are signed in</h1> : <h1>You are not signed in</h1>;
}

// Requests made in getInitialProps issued from server.
// Except for in-app nav where requests will be issued from browser.
LandingPage.getInitialProps = async (context) => {
    const { data } = await buildClient(context).get('/api/users/currentuser');

    return data;
};
// getInitialProps runs on server side and feeds props into the LandingPage component.
// this is how to typically load data during the server-side rendering phase.
// e.g. to fetch signed-in status.

export default LandingPage;