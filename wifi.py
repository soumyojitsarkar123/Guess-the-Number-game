
# Legitimate scenario: Recovering your OWN forgotten Wi-Fi password
import subprocess

def get_my_wifi_passwords():
    try:
        # Get saved Wi-Fi profiles
        data = subprocess.check_output(['netsh', 'wlan', 'show', 'profiles']).decode('utf-8').split('\n')
        profiles = [line.split(":")[1].strip() for line in data if "All User Profile" in line]
        
        # Extract passwords
        for profile in profiles:
            try:
                results = subprocess.check_output(['netsh', 'wlan', 'show', 'profile', profile, 'key=clear']).decode('utf-8').split('\n')
                password = [line.split(":")[1].strip() for line in results if "Key Content" in line]
                print(f"Wi-Fi: {profile}\nPassword: {password[0] if password else 'None'}\n")
            except subprocess.CalledProcessError:
                print(f"Failed to extract password for {profile}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    get_my_wifi_passwords()  # Only run this on YOUR OWN computer!