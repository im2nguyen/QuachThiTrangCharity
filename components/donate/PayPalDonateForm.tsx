const HOSTED_BUTTON_ID = "W4PY9AE3V83T6";

const DONATE_BUTTON_IMAGE =
  "https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif";

export function PayPalDonateForm() {
  return (
    <form
      action="https://www.paypal.com/donate"
      method="post"
      target="_top"
      className="inline-block"
    >
      <input type="hidden" name="hosted_button_id" value={HOSTED_BUTTON_ID} />
      <input type="hidden" name="no_recurring" value="1" />
      <input type="hidden" name="currency_code" value="USD" />
      <input
        type="image"
        src={DONATE_BUTTON_IMAGE}
        name="submit"
        title="PayPal - The safer, easier way to pay online!"
        alt="Donate with PayPal button"
        className="h-auto max-w-[10rem] cursor-pointer"
      />
      <img
        alt=""
        src="https://www.paypal.com/en_US/i/scr/pixel.gif"
        width={1}
        height={1}
        className="hidden"
      />
    </form>
  );
}
