# Privacy Safe Deep Learning DE-marked model utilized Web Framework on Ultrasound Images of Ovarian Cysts

# Member
The team name that developed the **HUFS BME Capstone 2024** project is **BME19**.

| **Daehyeon Choe** | **Yeongjin Jeong** |
| :---------------: | :-----------: |
| [<img src="https://github.com/dablro12.png" height=100 width=100><br/>@dablro12](https://github.com/dablro12) | [<img src="https://github.com/yeongjinjeong.png" height=100 width=100><br/>@yeongjinjeong](https://github.com/yeongjinjeong) |
| Lead <br/> AI Engineer | Fullstack <br/> Engineer |


# DL-WEB Overall Flow Chart 
![overallflow](https://github.com/dablro12/HUFS-BME-AI-WEB/assets/54443308/08c21c7f-e8da-4f48-a718-bdfe942c3801)



## AI-Part : OCI-GAN: Ovarian Cyst Inpaint GAN 

### Paper 1 
**High-Resolution Inpainting GAN for Deep Learning Classification Models on Ultrasound Images of Ovarian Cysts: OCI-GAN**

### Summary
본 프로젝트는 난소낭종 초음파 영상에서 인공적인 주석을 제거하여 딥러닝 모델의 진단 정확도를 높이는 인페인팅 기반 적대적 신경망모델을 개발하고 인페인팅 이미지에 대한 효과를 평가하였다. 난소낭종은 전 세계 여성 인구 중 약 7%가 앓고 있는 여성 건강의 중요한 문제로, 초기 진단과 정확한 병변 검출이 매우 중요하다. 현재 난소암의 조기 진단에는 초음파 영상이 널리 사용되고 있으나, 이러한 영상들은 종종 환자의 개인 정보나 측정값과 같은 인공적인 주석을 포함하고 있어, 이를 제거하지 않고서는 딥러닝 모델의 진단 정확도가 저하될 수 있다. 이에 본 내용에서는 초음파 영상에서 이러한 비병리학적 특징들을 효과적으로 제거함으로써, 모델이 실제 병변의 특징에 보다 집중할 수 있게 하는 OCI-GAN 모델을 제안한다.
이를 위해 Residual Block 기반의 아키텍처를 특징으로 하는 인페인팅 GAN 모델을 도입하여, 주석을 제거하고 고해상도 인페인팅 이미지를 생성하였다. 이 과정에서 다중 가중치 손실 함수와 깊은 레이어의 적용을 통해 모델의 성능을 극대화하였다. 또한, 2,965개의 데이터 세트를 활용하여 난소낭종 초음파 이미지 분류 모델에 전이 학습을 적용함으로써, 분류 모델의 성능 향상을 도모하였다.


### DL Flowchart
![DL Flowchart](https://github.com/dablro12/HUFS-BME-AI-WEB/assets/54443308/2fd63288-2259-4a81-957d-4e0d71289217)

### Detail of Network
![detail_network](https://github.com/dablro12/HUFS-BME-AI-WEB/assets/54443308/a21ee5df-b295-4797-bedd-243b5c7ad7de)

### Reconstuction comparsion of De-marked Method
| Generator Type       | MAE   | MSE   | PSNR    | SSIM   | FID   |
|----------------------|-------|-------|---------|--------|-------|
| Original Image | 84.2234 | 0.0551 | 121.5442 | 5.1533 | 13.2123 |
| U-Net                | 49.7447 | 0.0149 | 249.8968 | 7.7485 | 9.6482  |
| VAE                  | 4.0569  | 0.0078 | 295.2726 | 8.4081 | 2.2082  |
| OCI-GAN       | 3.0920  | 0.0076 | 307.6688 | 8.5008 | 2.1757  |

### Classification Comparision of Train Data Type using Convext-L
| Inpainting Method | Recall↑ | Specificity↑ | PPV↑  | NPV↑  | F1_score↑ | Accuracy↑ | roc_auc_score↑ |
|-------------------|---------|--------------|-------|-------|-----------|-----------|----------------|
| Original    | 0.741   | 0.812        | 0.640 | 0.884 | 0.694     | 0.796     | 0.846          |
| U-Net             | 0.748   | 0.769        | 0.588 | 0.874 | 0.658     | 0.762     | 0.821          |
| VAE               | 0.758   | 0.783        | 0.607 | 0.880 | 0.674     | 0.776     | 0.843          |
| OCI-GAN     | 0.758   | 0.810        | 0.632 | 0.877 | 0.682     | 0.789     | 0.845          |
### Result of Proposed-Method
![ext_result](https://github.com/dablro12/HUFS-BME-AI-WEB/assets/54443308/c75063f5-f2c2-4794-8f06-a13229839a5f)

### Grad-CAM Analysis
![gradcam](https://github.com/dablro12/HUFS-BME-AI-WEB/assets/54443308/aa934713-459e-4bbb-844c-b4ce61acf65e)

## Model Serving-Part : OCI-GAN: Ovarian Cyst Inpaint GAN 

### Paper 2
**인공지능을 활용한 초음파 이미지 Inpainting 모델 및 의료 딥러닝 서비스 웹 플랫폼 제작**

### Summary
본 프로젝트에서는 난소 낭종 초음파 영상의 주석 제거 및 복원을 위해 인페인팅(Inpainting) 기법을 적용한 Generative Adversarial Network(GAN) 기반 인공지능 모델과 의료 딥러닝 서비스 웹 플랫폼을 제작하였다. 

초음파 영상은 의사들이 영상 촬영과 동시에 중요한 부분을 캡쳐하여 주석을 추가함으로써 얻어지는 특성이 있으나, 인공지능 학습을 위해서는 주석이 없는 데이터가 필요하다. 이를 해결하기 위해, 본 연구에서는 인페인팅 기법으로 진단 시 원하지 않는 정보를 제거 및 복원하고, 병변 특징에 집중할 수 있는 인공지능 모델을 제안하였다.
모델 활용에 대한 편의성을 높이기 위해 클라우드 기반 웹 서비스 환경을 설계하였다. Node.js 런타임 환경, React 라이브러리, Express 모듈을 이용하여 프론트엔드(Front-end)와 백엔드(Back-end)를 구현하였고, 데이터베이스(DataBase)는 MySQL을 통해 구축하였다.

결론적으로, 본 연구에서 개발한 인공지능의 주석 제거 및 인페인팅을 통해 데이터 전처리의 효율성을 높였다. 이는 궁극적으로 난소 낭종 종양 분류 진단에 도움이 될 수 있음을 시사한다. 또한, 이것을 웹 플랫폼으로 제작함으로써 인공지능 모델 활용의 편의성과 접근성을 높이고, 향후 의료 이미지 처리의 서비스화에 대한 참고자료가 될 수 있음을 시사한다.


### WEB Flowchart
<img width="1280" alt="스크린샷 2024-06-02 오후 3 10 32" src="https://github.com/dablro12/HUFS-BME-AI-WEB/assets/134537573/102420d9-2c4f-4b7b-ae9e-6d55514d849c">


### Demo Video
https://github.com/dablro12/HUFS-BME-AI-WEB/assets/134537573/53101935-0660-4503-804f-8d73bc147633

---
This README provides a concise summary of the OCI-GAN project, its objectives, methodologies, and key findings, as well as step-by-step instructions to set up and run the login page for the application.

--
