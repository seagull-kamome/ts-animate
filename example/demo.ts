
import { Tween, easeLinear } from '../src/ts-animate/Tween'
import { mutateRGBStyle } from '../src/ts-animate/Tween/StyleMutator';



document.addEventListener('DOMContentLoaded', async () => {
    {
      const x = new Tween(easeLinear, 2000, false,
        mutateRGBStyle('#example-1 > p', 'background', [255, 255, 255], [255, 0, 0]) );
      (document.querySelector('#example-1 > button') as HTMLButtonElement)
        .addEventListener('click', () => { x.start(); });
    }

  });


