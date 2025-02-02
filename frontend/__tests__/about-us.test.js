import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutUs from '../pages/about-us';

describe('AboutUs', () => {
    it('renders the About Us page', () => {
        render(<AboutUs />);
        
        // Check if the main heading is rendered
        expect(screen.getByText('About Us')).toBeInTheDocument();
        
        // Check if the subheading is rendered
        expect(screen.getByText("Introducing CashMaster 3000: The Only Finance App You'll Ever Need (Until the Next One)")).toBeInTheDocument();
        
        // Check if the paragraphs are rendered
        expect(screen.getByText(/Are you tired of financial chaos\?/)).toBeInTheDocument();
        expect(screen.getByText(/With CashMaster 3000, you can log every expense/)).toBeInTheDocument();
        expect(screen.getByText(/Of course, you could do all of this with a notebook and a pen/)).toBeInTheDocument();
    });
});