#!/bin/bash

# Activate your virtual environment if needed
source /home/eiden/miniconda3/activate

source activate eiden
# Run the Python script with arguments
python3 script.py \
    --img_dir '/home/eiden/eiden/capstone/HUFS-BME-AI-WEB/WEB/inference/img' \
    --mask_dir '/home/eiden/eiden/capstone/HUFS-BME-AI-WEB/WEB/inference/mask' \
    --save_path '/home/eiden/eiden/capstone/HUFS-BME-AI-WEB/WEB/inference/res' \
    --model_path '/home/eiden/eiden/capstone/HUFS-BME-AI-WEB/AI/inference/model/weight/OCI-GAN-Generator.pt' \
    --visual_save_path '/home/eiden/eiden/capstone/HUFS-BME-AI-WEB/WEB/inference/res' \
    --batch_size 1
