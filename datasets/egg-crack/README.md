# ALEX GUARD AI — Egg crack detection

## Website integration

The website now uses the Roboflow hosted model:

- Model endpoint: `egg-crack-detection-eu65a/1`
- Model page: https://universe.roboflow.com/innodatatics-yyp09/egg-crack-detection-eu65a
- Output classes: `Brown cracked eggs` and `White cracked eggs`
- The browser sends sampled video frames to Roboflow only after the user enters an API key in Settings.
- The key is stored in the browser's local storage and is not committed to this repository.
- Inference runs asynchronously on sampled frames so it does not intentionally pause HTML video playback.
- The UI labels detections as "شق محتمل" (possible crack), not as a confirmed broken egg.

## Important limitations

1. This hosted model only reports cracked-egg classes. It does not classify every egg as intact or broken.
2. No detection in a frame is **not** proof that all eggs are intact.
3. The model was trained by a third party. Its reported metrics are not a guarantee of accuracy on this conveyor video, camera, lighting, distance, or egg type.
4. Validate it with representative footage from the actual production line before relying on it for quality control.
5. Video frames are sent to Roboflow for inference when the API key is configured. Do not enable cloud inference for confidential footage unless that transfer is acceptable.

## Reference datasets and images

- **360digitmg Egg Crack Detection Dataset** — 978 images with four classes: cracked brown, cracked white, normal brown, and normal white. License shown on the dataset page: Public Domain.  
  https://universe.roboflow.com/360digitmg-swnfx/egg-crack-detection-yjhsy
- **Innodatatics EGG CRACKS DETECTION** — public dataset and hosted model page. Dataset license shown as CC BY 4.0.  
  https://universe.roboflow.com/innodatatics-09dbx/egg-cracks-detection
- **Datta et al. (2019)** — 840 annotated RGB images for crack detection, described in the poultry computer-vision dataset survey.  
  https://figshare.com/articles/dataset/Dataset_for_real-time_crack_detection_on_chicken_eggs/21568425
  https://pmc.ncbi.nlm.nih.gov/articles/PMC11762189/

The website's reference gallery displays example images from Roboflow image hosts. These gallery images are illustrative; they are not loaded into or used to train the hosted model by this website.
