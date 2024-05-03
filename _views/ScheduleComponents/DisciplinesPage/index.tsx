import { Arcticle } from '@/_views/ui/Arcticle';
import cls from './index.module.scss';
import { DisciplinesHeader } from './DisciplinesHeader';
import { Disciplines } from './Disciplines';

const DisciplinesPage = () =>{
    const disciplinesPage =(
        <Arcticle>
            <DisciplinesHeader />
            <Disciplines/>
        </Arcticle>
    );
    return disciplinesPage;
};

export {DisciplinesPage}