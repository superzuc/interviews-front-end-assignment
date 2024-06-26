import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import RecipeDetails from '../RecipeDetails';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { Comment } from 'src/types';

describe('RecipeDetails', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('allows adding a comment and fetching it', async () => {
        render(
            <MemoryRouter initialEntries={['/recipe-details/1']}>
                <Routes>
                    <Route path="/recipe-details/:id" element={<RecipeDetails />} />
                </Routes>
            </MemoryRouter>
        );

        // Fill out and submit the comment form
        fireEvent.change(screen.getByPlaceholderText(/Write your comment here/i), {
            target: { value: 'New test comment' },
        });

        // Select a rating (assuming 5-star rating system)
        fireEvent.click(screen.getByLabelText('Rating: 5'));

        // Submit the comment form
        fireEvent.click(screen.getByText(/Submit Comment/i));

        // Wait for the comment to be added
        await waitFor(() => {
            expect(screen.getByText('New test comment')).toBeInTheDocument();
        });

        // Fetch the comments to verify the new comment is present
        const response = await fetch('http://localhost:8080/comments');
        const comments = await response.json();

        const addedComment = comments.find((comment: { comment: string; }) => comment.comment === 'New test comment');
        expect(addedComment).not.toBeUndefined();
        expect(addedComment.rating).toBe(5);
    });
});


