# ALEX GUARD AI — Egg crack reference data

## Current status

This folder documents the public datasets selected for the egg-shell crack detection work. The website currently displays two cited visual references in its "مكتبة الصور المرجعية" panel. The image files are still served by their original publishers; they have **not** been copied into this repository, and this reference gallery is **not a trained classifier**.

## Candidate public dataset

- **Egg Crack Detection Dataset (360digitmg)**
- 978 images; four labels: Cracked Egg Brown, Cracked Egg White, Normal Egg Brown, Normal Egg White.
- License shown on the dataset page: Public Domain.
- Source: https://universe.roboflow.com/360digitmg-swnfx/egg-crack-detection-yjhsy

## Additional RGB crack dataset

- **Dataset for real-time crack detection on chicken eggs** (Datta et al., 2019)
- 840 annotated smartphone images; 740 train and 100 test images.
- Source: https://figshare.com/articles/dataset/Dataset_for_real-time_crack_detection_on_chicken_eggs/21568425
- Dataset description and image capture details: https://pmc.ncbi.nlm.nih.gov/articles/PMC11762189/

## Important engineering notes

1. Do not infer cracked/healthy status from tray color or average hue.
2. Train and validate an image model using the dataset's actual annotations and split. Do not use test images for training.
3. The production camera should capture close, sharp views of each eggshell. A wide conveyor frame with tiny eggs is not equivalent to the dataset's close-up images.
4. Until trained weights are bundled and inference is implemented, the UI must describe the gallery as visual references only and must not display "healthy" or "cracked" AI predictions.
5. Any eventual model must be evaluated on held-out images from the same target camera/lighting setup before operational use.

## Image attribution used by the website

- Springer Nature, Figure 13 from "A cost-effective prototype for egg crack detection and labeling with a comprehensive review of existing methods" (2025), CC BY-NC-ND 4.0. The figure is embedded unchanged and linked to the source article: https://link.springer.com/article/10.1007/s44187-025-00604-2
- Roboflow Universe, Egg Crack Detection image by Lakshmi Kaviti. Source page: https://universe.roboflow.com/lakshmi-kaviti-xyhms/egg-crack-detection-k65q0

The website currently loads these two sample images from their original hosts. They are not stored as local image assets in this repository yet.
