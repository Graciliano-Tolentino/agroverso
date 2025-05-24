import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import MarketplaceSection from './MarketplaceSection';

expect.extend(toHaveNoViolations);

test('MarketplaceSection não possui violações de acessibilidade', async () => {
  const { container } = render(<MarketplaceSection />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
