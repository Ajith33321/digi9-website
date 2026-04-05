import glob
import os
from PIL import Image, ImageChops, ImageFilter, ImageDraw

def process_images_hq():
    files = glob.glob('assets/mascot/*.png') # Start from current processed PNGs or re-process JPGs if available
    # Actually, the user already provided JPGs, and I converted them to PNGs.
    # To get the best quality, I should ideally re-process from the original source if possible.
    # But since the script already deleted JPGs, I'll try to work with the current ones or assume the user might provide them again.
    # Wait, the user already deleted the original ones? 
    # Let's check for JPGs first.
    jpg_files = glob.glob('assets/mascot/*.jpg')
    if not jpg_files:
        print("No JPGs found. Re-processing existing PNGs with edge smoothing...")
        files = glob.glob('assets/mascot/*.png')
    else:
        print(f"Found {len(jpg_files)} JPG files. High-quality processing starting...")
        files = jpg_files

    for file in files:
        img = Image.open(file).convert("RGBA")
        width, height = img.size
        
        # 1. Flood Fill to find background
        # We'll create a mask where the background is white
        # We'll use a tolerance to handle JPEG artifacts
        mask = Image.new('L', (width, height), 0)
        
        # Using ImageDraw.floodfill to mark the background
        # Starting from corners
        temp_img = img.convert("L")
        # We want to fill areas that are "nearly white"
        # Seed points: (0,0), (w-1, 0), (0, h-1), (w-1, h-1)
        seeds = [(0,0), (width-1, 0), (0, height-1), (width-1, height-1)]
        
        # Create a simplified white/black version for floodfill
        # Anything > 230 is "background" candidate
        threshold = 230
        bg_candidate = temp_img.point(lambda p: 255 if p > threshold else 0)
        
        for seed in seeds:
            ImageDraw.floodfill(bg_candidate, seed, 127)
        
        # Now bg_candidate has 127 for background, 0 or 255 for others
        final_mask = bg_candidate.point(lambda p: 255 if p == 127 else 0)
        
        # 2. Smooth the mask to fix jagged edges
        # We invert the mask (Mascot = 255, BG = 0)
        mascot_mask = ImageChops.invert(final_mask)
        mascot_mask = mascot_mask.filter(ImageFilter.GaussianBlur(radius=1))
        
        # 3. Create the transparent image
        img.putalpha(mascot_mask)
        
        base = os.path.splitext(file)[0]
        img.save(base + '.png', "PNG")
        
        if file.endswith('.jpg'):
            os.remove(file)
            
    print("HQ Background removal and smoothing complete.")

if __name__ == "__main__":
    process_images_hq()
