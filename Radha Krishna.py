import tkinter as tk
import random

# Create window
root = tk.Tk()
root.title("Radha–Krishna Flute Animation")
root.configure(bg="black")

canvas = tk.Canvas(root, width=800, height=600, bg="black", highlightthickness=0)
canvas.pack()

# Draw moon
canvas.create_oval(600, 50, 700, 150, fill="lightyellow", outline="")

# Krishna body (very simple silhouette)
krishna_body = canvas.create_oval(350, 250, 400, 350, fill="navyblue", outline="")
krishna_head = canvas.create_oval(365, 200, 395, 230, fill="darkblue", outline="")

# Flute
flute = canvas.create_rectangle(395, 240, 495, 250, fill="gold", outline="brown")

# Radha body (simple silhouette)
radha_body = canvas.create_oval(420, 260, 480, 380, fill="purple", outline="")
radha_head = canvas.create_oval(440, 210, 470, 240, fill="indigo", outline="")

# Musical notes storage
notes = []

def create_note():
    """Create a floating musical note near the flute"""
    x = 495
    y = 240
    note = canvas.create_text(x, y, text=random.choice(["♪", "♫", "♬"]), 
                              fill="white", font=("Arial", 20, "bold"))
    notes.append(note)
    root.after(800, create_note)  # new note every 0.8s

def animate_notes():
    """Move notes upward slowly"""
    for note in notes:
        canvas.move(note, random.randint(-2, 2), -5)  # small horizontal drift
        x, y = canvas.coords(note)
        if y < 50:  # if note goes too high, delete
            canvas.delete(note)
            notes.remove(note)
    root.after(100, animate_notes)

# Start animations
create_note()
animate_notes()

root.mainloop()
