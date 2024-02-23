import { Container } from "@/_views/ui/Container"
import { WindowWrapper } from "@/_views/ui/WindowWrapper"


const _404Page = () =>{
    return(
        <main>
        <Container>
            <WindowWrapper>
                    <div>Ошибка 404</div>
            </WindowWrapper>
        </Container>
        </main>
    )
}

export default _404Page;