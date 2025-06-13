import React, { act } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
const Form = ({ action }) => {
  return (
    <form
      action={action}
      className="max-w-xl mx-auto px-6 py-12 flex flex-col gap-4"
    >
      <Input type="text" placeholder="Title" name="title" />

      <textarea
        placeholder="Description"
        name="description"
        className="border rounded p-2"
        rows="4"
      ></textarea>

      <Input type="number" placeholder="Price Per Night" name="pricePerNight" />
      <Input type="location" placeholder="location" name="location" />

      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="picture">Picture</Label>
        <Input id="picture" type="file" name="imageUrls" multiple />
      </div>

      <div className="flex flex-col gap-2">
        <label className="flex items-center gap-2">
          <Checkbox id="wifi" value="WiFi" name="amenities" />
          <span>WiFi</span>
        </label>

        <label className="flex items-center gap-2">
          <Checkbox id="parking" value="Parking" name="amenities" />
          <span>Parking</span>
        </label>

        <label className="flex items-center gap-2">
          <Checkbox id="breakfast" value="Breakfast" name="amenities" />
          <span>Breakfast</span>
        </label>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
