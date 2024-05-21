import { Auth } from "@/_views/inHomeComponents/pages/Auth"
import Meta from "@/_views/seo/Meta"
import { WindowWrapper } from "@/_views/ui/WindowWrapper"


const AuthPage = () => {
    return (
        <Meta title="Авторизация">
            <WindowWrapper>
                <Auth />
            </WindowWrapper>
        </Meta>
    )
}

export default AuthPage;