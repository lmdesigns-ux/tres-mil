# Tres mil

A standalone Spanish number practice app, completely separate from spanish-flashcards. It generates number prompts from 0 through 3,000 on demand; it does not create or import vocabulary cards and never reads the flashcard app’s saved data.

Run `npm run dev` in this directory and open http://127.0.0.1:5180. Run `npm test` for number conversion and grading checks. No dependencies or build step are needed; static assets live in dist/.

Type the standalone Spanish cardinal number and press Enter to check, then Enter for another prompt. Use the accent buttons if needed. Capitalization, Unicode composition and repeated whitespace are normalized; spelling and accents count. Missing/wrong accents receive specific feedback and go into review. Context-free numbers use uno/veintiuno rather than noun-dependent un/una forms. Standard contemporary spellings are used.

Select the full range or a smaller practice range. Immediate repeats are avoided in random practice. Review draws only from missed numbers within the selected range; a correct answer removes a number, and clearing the review queue returns to random practice. The same number is checked only once per prompt. Session counts are not durable mastery measures. Misses persist on this browser using the separate tres-mil-misses-v1 key; storage failures fall back to session-only practice with a visible notice. Clear saved misses asks for confirmation. There is no timer, microphone grading or vocabulary integration.
