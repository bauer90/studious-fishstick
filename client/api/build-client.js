import axios from "axios";

// returns a customized axios object that can be used 
// axiosObj.get('relative-url')
export default ({ req }) => {
    if (typeof window === 'undefined') {
        // we are on the server request should be made to
        // http://ingress-nginx-controller.ingress-nginx... (kubernetes namespace)
        // This is because server is running in Pods and it can't reach ticketing.dev url
        return axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers,
        });
    } else {
        // we are on the browser. requests can be made with a base url of ''.
        // Can only use axios here. Can't use use-request hook because hooks can only be used in React Components.
        return axios.create({
            baseURL: '/',
        });
    }
};