import { Title } from "@/_views/ui/Title/Index";
import cls from "./index.module.scss";
import { Button } from "@/_views/ui/Button";
import { useState } from "react";
import { PopUp } from "@/_views/ui/PopUp";
import { Form } from "@/_views/ui/Form";
import { Input } from "@/_views/ui/Input";
import { TextArea } from "@/_views/ui/textArea";
import { Arcticle } from "@/_views/ui/Arcticle";

const DisciplinesHeader = () => {

    const [isOpenPopUp, setOpenPopUp] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [name, setName] = useState<string>('')
    const disciplinesHeader = (
        
        <>
            <div className={cls.title}>
                <Title>Дисциплины</Title>
                <Button darkBtn onClick={() => setOpenPopUp(true)}>Создать</Button>
            </div>
            {isOpenPopUp && (
                <PopUp title='Создание факультета' setOpenPopUp={setOpenPopUp}>
                    <Form >
                        <Input
                            type="text"
                            autoFocus
                            label="Название"
                            placeholder={''}
                            value={name}
                            onChange={(value) => setName(value)} />

                        <TextArea
                            type="text"
                            label="Преподаватель"
                            value={name}
                            
                        />
                       
                        <Button lightBtn type='submit'>
                            Создать
                        </Button>
                        {error && <span>{error}</span>}
                    </Form>
                </PopUp>
            )}
        </>
    );

return disciplinesHeader;
};

export { DisciplinesHeader };