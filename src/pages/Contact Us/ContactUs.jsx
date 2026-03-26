export default function ContactUs() {
  return (
    <div
      className="min-h-screen px-4 py-12 transition-colors duration-300"
      style={{
        backgroundColor: "var(--bg-default)",
        color: "var(--text-primary)",
      }}
    >
      <div className="max-w-4xl mx-auto text-center">

        {/* Heading */}
        <h1
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ color: "var(--text-primary)" }}
        >
          Contact Us
        </h1>

        <h2
          className="text-base md:text-lg mb-10"
          style={{ color: "var(--text-secondary)" }}
        >
          Wanna connect with us? <br className="hidden md:block" />
          You can do so through the below mentioned links.
        </h2>

        {/* Contact Cards */}
        <div className="flex flex-col sm:flex-row justify-center gap-8 mb-12">

          {/* Email */}
          <div
            className="rounded-xl px-6 py-6 w-full sm:w-72 transition-all duration-300"
            style={{
              backgroundColor: "var(--bg-paper)",
              border: "1px solid var(--border-color)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--card-hover)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--bg-paper)")
            }
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/4213/4213968.png"
              alt="Email"
              className="mx-auto h-16 w-16 mb-4"
            />
            <p
              className="text-sm break-all"
              style={{ color: "var(--text-secondary)" }}
            >
              nn8ninsyssky@gmail.com
            </p>
          </div>

          {/* Phone */}
          <div
            className="rounded-xl px-6 py-6 w-full sm:w-72 transition-all duration-300"
            style={{
              backgroundColor: "var(--bg-paper)",
              border: "1px solid var(--border-color)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--card-hover)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "var(--bg-paper)")
            }
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/0/191.png"
              alt="Phone"
              className="mx-auto h-16 w-16 mb-4"
            />
            <p
              className="text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              8837334155
            </p>
          </div>
        </div>

        {/* Social Section */}
        <h3
          className="text-lg font-semibold mb-6"
          style={{ color: "var(--text-primary)" }}
        >
          Find us on social media
        </h3>

        <div
          className="flex justify-center gap-6 mb-12"
          style={{ color: "var(--text-secondary)" }}
        >
          {/* Placeholder */}
        </div>

        {/* Footer Message */}
        <h3
          className="font-bold text-lg mb-1"
          style={{ color: "var(--primary)" }}
        >
          Thank You!
        </h3>
        <p
          className="text-sm"
          style={{ color: "var(--primary)" }}
        >
          We will get back to you soon...
        </p>

      </div>
    </div>
  );
}
