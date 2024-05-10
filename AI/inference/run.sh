#!/bin/bash

# Activate your virtual environment if needed
source /home/eiden/anaconda3/bin/activate eiden

# Run the Python script with arguments
python3 script.py \
    --img_dir '/home/eiden/eiden/capstone/HUFS-BME-AI-WEB/WEB/inference/img' \
    --mask_dir '/home/eiden/eiden/capstone/HUFS-BME-AI-WEB/WEB/inference/mask' \
    --model_path '/home/eiden/eiden/capstone/HUFS-BME-AI-WEB/AI/inference/model/weight/OCI-GAN-Generator.pt' \
    --save_dir '/home/eiden/eiden/capstone/HUFS-BME-AI-WEB/WEB/inference/res' \
    --visual_save_dir '/home/eiden/eiden/capstone/HUFS-BME-AI-WEB/WEB/inference/res_compare' \
    --batch_size 1
