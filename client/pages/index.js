const LandingPage = ({ color }) => {
    console.log("i'm in the component", color);
    return <h1>Landing page</h1>
} // color=red loaded to this component. 

LandingPage.getInitialProps = () => {
    console.log("I'm on the server");
    return { color: 'red' };
};// getInitialProps runs on server side and feeds the color=red into the LandingPage component.
// this is how to typically load data during the server-side rendering phase.
// e.g. to fetch signed-in status.

export default LandingPage;