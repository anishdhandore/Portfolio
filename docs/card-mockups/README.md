# Card mockups

Designed product UIs for the project cards in the "More work" deck
(`src/components/deck`). Each project has a `front` and a `back` screen;
they are rendered at 1280×800 @2x and exported as WebP into
`src/images/projects/<project>-<view>.webp`.

These are polished redesigns based on each project's real UI and README —
not screenshots of the original apps.

To change one: edit the HTML, open it in a browser at 1280×800, take a 2×
screenshot and export it as WebP (quality ~82, 1400px wide).

## Photos

Free photos from [Unsplash](https://unsplash.com/license), stored in `photos/`:

| File | Unsplash photo |
|---|---|
| `golden-retriever.jpg` | `photo-1551887373-3c5bd224f6e2` |
| `frames-wall.jpg` | `photo-1554907984-15263bfd63bd` |
| `museum-visitors.jpg` | `photo-1569783721854-33a99b4c0bae` |
| `gallery-white.jpg` | `photo-1605429523419-d828acb941d9` |
| `abstract-painting.jpg` | `photo-1615184697985-c9bde1b07da7` |

## Where the data comes from

- Dance AI — model metrics from the Dance_AI_Cleanup README (86.6% accuracy, SVR MAE 0.155…)
- Soccer — matches won / win ratios and MAE 31.97 / RMSE 39.72 from the Colab notebook
- Preserving Paws — shelters (DogiKat, Transform A Street Dog, E.B.A.R.R.) from the demo video
- Safe Space — genius.com lyrics page flagged for 50 words, from the project's MongoDB demo
- Everything else (prompts, example scans, counts like "12 nearby") is illustrative
