import Bridge from "@/components/Bridge/Bridge";
import { useRouter } from "next/router";
import DashboardPage from "./dashboard";
import FeedbackPage from "./feedback";
import TransactionsPage from "./transactions";

function MainPage() {

    const router = useRouter();

    if(router.pathname === '/'){
        return (<Bridge/>)
    }else if(router.pathname === '/transactions'){
        return (<TransactionsPage/>)
    }else if(router.pathname === '/dashboard'){
        return (<DashboardPage/>)
    }else if(router.pathname === '/feedback'){
        return (<FeedbackPage/>)
    }else return (<></>);


}



export default MainPage;