# OCI-GAN: Ovarian Cyst Inpaint GAN
**Privacy Safe Deep Learning DE-marked Models on Ultrasound Images of Ovarian Cysts**

## Paper
**High-Resolution Inpainting GAN for Deep Learning Classification Models on Ultrasound Images of Ovarian Cysts: OCI-GAN**

## Abstract
본 연구는 난소낭종 초음파 영상에서 인공적인 주석을 제거하여 딥러닝 모델의 진단 정확도를 높이는 인페인팅 기반 적대적 신경망 모델을 개발하고 인페인팅 이미지에 대한 효과를 평가하였다. 난소낭종은 전 세계 여성 인구 중 약 7%가 앓고 있는 여성 건강의 중요한 문제로, 초기 진단과 정확한 병변 검출이 매우 중요하다. 현재 난소암의 조기 진단에는 초음파 영상이 널리 사용되고 있으나, 이러한 영상들은 종종 환자의 개인 정보나 측정값과 같은 인공적인 주석을 포함하고 있어, 이를 제거하지 않고서는 딥러닝 모델의 진단 정확도가 저하될 수 있다. 이에 본 연구는 초음파 영상에서 이러한 비병리학적 특징들을 효과적으로 제거함으로써, 모델이 실제 병변의 특징에 보다 집중할 수 있게 하는 OCI-GAN 모델을 제안한다.

이를 위해 Residual Block 기반의 아키텍처를 특징으로 하는 인페인팅 GAN 모델을 도입하여, 주석을 제거하고 고해상도 인페인팅 이미지를 생성하였다. 이 과정에서 다중 가중치 손실 함수와 깊은 레이어의 적용을 통해 모델의 성능을 극대화하였다. 또한, 2,965개의 데이터 세트를 활용하여 난소낭종 초음파 이미지 분류 모델에 전이 학습을 적용함으로써, 분류 모델의 성능 향상을 도모하였다.

실험 결과, OCI-GAN은 주석이 제거된 이미지에서 높은 성능을 보여주었고, 주석이 제거된 데이터를 사용한 모델이 이미지 복원 평가에서 MAE(0.085)와 단일 분류 모델에서 기존 주석이 포함된 이미지에 비해 비교적 높은 Recall(0.87) 및 roc score(0.91)를 보여줌으로써, 인페인팅 데이터셋이 딥러닝 모델 성능 향상에 기여함을 확인하였다. 또한 Grad-CAM 분석을 통해 모델이 병변에 더 집중하고 있음을 시각적으로 확인하며, 초음파 병변 분류 모델에서 주석 제거의 중요성을 강조하고 있다.

결론적으로 불필요한 주석을 제거하는 OCI-GAN을 통해 의료 영상의 진단 정확성을 위한 깨끗한 데이터의 중요성을 강조하고, 초음파 이미지 데이터 문제와 난소낭종 초음파 영상 딥러닝 모델 성능에 기여할 것으로 기대할 수 있다.

## DL Flowchart
![DL Flowchart](https://github.com/dablro12/HUFS-BME-AI-WEB/assets/54443308/2fd63288-2259-4a81-957d-4e0d71289217)

## Grad-CAM Analysis
![Grad-CAM Analysis](https://github.com/dablro12/HUFS-BME-AI-WEB/assets/54443308/9c574eb7-01c8-405b-bb14-49945051aa9c)

## WEB Flowchart
<img width="1280" alt="스크린샷 2024-06-02 오후 3 10 32" src="https://github.com/dablro12/HUFS-BME-AI-WEB/assets/134537573/102420d9-2c4f-4b7b-ae9e-6d55514d849c">


---
This README provides a concise summary of the OCI-GAN project, its objectives, methodologies, and key findings, as well as step-by-step instructions to set up and run the login page for the application.
