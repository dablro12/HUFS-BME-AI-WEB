#!/bin/bash

# Activate your virtual environment if needed
# source /home/eiden/anaconda3/bin/activate eiden
# Run the Python script with arguments
# --project_dir "/home/eiden/eiden/capstone/HUFS-BME-AI-WEB" \

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
python3 "$DIR/script.py" \
    --env "APPLE" \
    --project_dir "../../" \
    --img_dir 'WEB/inference/img' \
    --mask_dir 'WEB/inference/mask' \
    --model_name "$1" \
    --model_dir 'AI/inference/model/weight' \
    --save_dir 'WEB/inference/res' \
    --visual_save_dir 'WEB/inference/res_compare' \
    --batch_size 1