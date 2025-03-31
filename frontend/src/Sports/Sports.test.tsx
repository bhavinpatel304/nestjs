import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Sports from './Sports';
import '@testing-library/jest-dom';
import axios from 'axios';
test("validates input length before submitting", async () => {
  render(<Sports />);
  
  const input = screen.getByPlaceholderText("Type something...");
  const submitButton = screen.getByText("Submit");

  fireEvent.change(input, { target: { value: "abc" } });
  fireEvent.click(submitButton);

  await waitFor(() => {
    expect(screen.getByText("Team name must be between 5 and 20 characters")).toBeInTheDocument();
  });
});



test("validates Arsenal ", async () => {

  let mockData = 
  { data: 
    { data: 
      [{ strTeam: "arsenal", strLeague: "English Premier League", strCountry: "England", strLogo: "https://r2.thesportsdb.com/images/media/team/logo/q2mxlz1512644512.png" }], 
      error: 0, message: "Success" 
    } 
  };
  
  // (axios as jest.Mocked<typeof axios>).post.mockResolvedValueOnce({ data: mockData });


  render(<Sports />);
  
  const input = screen.getByPlaceholderText("Type something...");
  const submitButton = screen.getByText("Submit");

  fireEvent.change(input, { target: { value: "arsenal" } });
  fireEvent.click(submitButton);
  await waitFor(() => {
    expect(screen.getByText("arsenal")).toBeInTheDocument();
  });

});
