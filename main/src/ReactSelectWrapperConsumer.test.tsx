import { fireEvent, render } from '@testing-library/react';
import ReactSelectWrapperConsumer from './ReactSelectWrapperConsumer';

test('open menu test', async () => {
    const { container  } = render(
        <ReactSelectWrapperConsumer />
    );

    fireEvent.keyDown(container.querySelector('input')!, { key: 'ArrowDown', code: 40 });
});
