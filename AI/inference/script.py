import argparse
from inference import InpaintingService

def parse_arguments():
    parser = argparse.ArgumentParser(description="Inpainting Service Arguments")
    parser.add_argument("--img_dir", type=str, required=True,
                        help="Path to the directory containing input images.",
                        default= '/home/eiden/eiden/capstone/HUFS-BME-AI-WEB/WEB/inference/img')
    parser.add_argument("--mask_dir", type=str, required=True,
                        help="Path to the directory containing mask images.",
                        default= '/home/eiden/eiden/capstone/HUFS-BME-AI-WEB/WEB/inference/mask')
    parser.add_argument("--save_path", type=str, required=True,
                        help="Path to save the resulting images.",
                        default= '/home/eiden/eiden/capstone/HUFS-BME-AI-WEB/WEB/inference/res')
    parser.add_argument("--model_path", type=str, required=True,
                        help="Path to the trained model.",
                        default= '/home/eiden/eiden/capstone/HUFS-BME-AI-WEB/AI/inference/model/weight/OCI-GAN-Generator.pt' )
    parser.add_argument("--visual_save_path", type=str, default=None,
                        help="Path to save visualizations. Default is the save_path.",
                        default= '/home/eiden/eiden/capstone/HUFS-BME-AI-WEB/WEB/inference/res')
    parser.add_argument("--batch_size", type=int, default=1,
                        help="Batch size for inference. Default is 1.",
                        default= 1)
    return parser.parse_args()

if __name__ == "__main__":
    args = parse_arguments()
    inpainting_service = InpaintingService(args.img_dir, args.mask_dir, args.save_path, args.model_path, args.visual_save_path, args.batch_size)
    inpainting_service.infer()


