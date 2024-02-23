import { Auth } from "@/_views/inHomeComponents/pages/Auth"
import { Container } from "@/_views/ui/Container"
import { WindowWrapper } from "@/_views/ui/WindowWrapper"


const AuthPage = () =>{
    return(
        <main>
        <Container>
            <WindowWrapper>
                    <Auth />
            </WindowWrapper>
        </Container>
        </main>
    )
}

export default AuthPage;