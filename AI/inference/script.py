import argparse
from inference import InpaintingService

def parse_arguments():
    parser = argparse.ArgumentParser(description="Inpainting Service Arguments")
    
    parser.add_argument("--img_dir", type=str, default='/home/eiden/eiden/capstone/HUFS-BME-AI-WEB/WEB/inference/img',
                        help="Path to the directory containing input images.")
    
    parser.add_argument("--mask_dir", type=str, default='/home/eiden/eiden/capstone/HUFS-BME-AI-WEB/WEB/inference/mask',
                        help="Path to the directory containing mask images.")
    
    parser.add_argument("--model_path", type=str, default='/home/eiden/eiden/capstone/HUFS-BME-AI-WEB/AI/inference/model/weight/OCI-GAN-Generator.pt',
                        help="Path to the trained model.")
    
    parser.add_argument("--save_dir", type=str, default='/home/eiden/eiden/capstone/HUFS-BME-AI-WEB/WEB/inference/res',
                        help="Path to save the resulting images.")
    
    parser.add_argument("--visual_save_dir", type=str, default='/home/eiden/eiden/capstone/HUFS-BME-AI-WEB/WEB/inference/res_compare',
                        help="Path to save visualizations. Default is the save_path.")
    
    parser.add_argument("--batch_size", type=int, default=1,
                        help="Batch size for inference. Default is 1.")
    
    return parser.parse_args()

if __name__ == "__main__":
    args = parse_arguments()
    inpainting_service = InpaintingService(
        img_dir = args.img_dir,
        mask_dir = args.mask_dir,
        model_path = args.model_path,
        save_path = args.save_dir,
        visual_save_path = args.visual_save_dir,
        batch_size = args.batch_size)
    inpainting_service.infer()
